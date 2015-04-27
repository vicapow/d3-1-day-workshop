'use strict'

// A small piece of code for plugging into the d3 life cycle.
var d3SelectionDispatcher = d3.dispatch('afterSelection')

;(function() {
  var d3_selection_prototype_select = d3.selection.prototype.select
  d3.selection.prototype.select = function() {
    var selector = d3_selection_prototype_select.apply(this, arguments)
    selectionHook(selector)
    return selector
  }

  var d3_select = d3.select
  d3.select = function() {
    var selector = d3_select.apply(this, arguments)
    selectionHook(selector)
    return selector
  }

  var d3_selection_prototype_transition = d3.selection.prototype.transition
  d3.selection.prototype.transition = function() {
    var transition = d3_selection_prototype_transition.apply(this, arguments)
    transition.each('end', function() {
      selectionHook(d3.select(this))
    })
    return transition
  }

  var timerId = null
  function selectionHook(selector) {
    var element = selector.node()
    var childOfNodeTree = false
    if (element) {
      while(element.parentElement) {
        if (element.parentElement.classList.contains('node-tree')) {
          childOfNodeTree = true
        }
        element = element.parentElement
      }
      if (!childOfNodeTree) {
        if (timerId) {
          clearTimeout(timerId)
        }
        timerId = setTimeout(function() {
          timerId = null
          d3SelectionDispatcher.afterSelection()
        }, 0)
      }
    }
  }
})()