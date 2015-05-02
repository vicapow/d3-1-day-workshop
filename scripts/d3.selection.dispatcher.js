'use strict'

// A small piece of code for plugging into the d3 life cycle.
var d3SelectionDispatcher = d3.dispatch('afterSelection')

;(function() {
  var d3_selection_prototype_select = d3.selection.prototype.select
  d3.selection.prototype.select = function() {
    var selector = d3_selection_prototype_select.apply(this, arguments)
    selectionUpdateHook(selector)
    return selector
  }

  var d3_select = d3.select
  d3.select = function() {
    var selector = d3_select.apply(this, arguments)
    selectionUpdateHook(selector)
    return selector
  }

  var d3_selection_prototype_transition = d3.selection.prototype.transition
  d3.selection.prototype.transition = function() {
    var transition = d3_selection_prototype_transition.apply(this, arguments)
    transition.each('end.__selection_dispatcher', function() {
      selectionUpdateHook(d3.select(this))
    })
    return transition
  }

  var d3_transition_prototype_transition = d3.transition.prototype.transition
  d3.transition.prototype.transition = function() {
    var transition = d3_transition_prototype_transition.apply(this, arguments)
    transition.each('end.__selection_dispatcher', function() {
      selectionUpdateHook(d3.select(this))
    })
    return transition
  }

  var timerId = null
  function selectionUpdateHook(selector) {
    var element = selector.node()
    var childOfNodeTree = false
    if (element) {
      while(element.parentElement) {
        // TODO: change `node-tree` to something like `__node_tree__`
        if (element.parentElement.classList.contains('node-tree')) {
          childOfNodeTree = true
          break
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
        }, 100)
      }
    }
  }
})()