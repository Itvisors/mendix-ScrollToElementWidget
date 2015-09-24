# Scroll to element widget

Scroll element into view when attribute value was changed.


## Typical usage scenario

Scroll an element into view after reload of a page. Useful with listview and template grid. Whenever an attribute of a parent object changes, the widget will look for the value in the list items and scroll the item into view that has the value. 

An example is a list of orders. The main dataview is an entity that has an attribute _PositionToOrderNumber_. Each time that value changes, the widget will look for the item that has the ordernumber.

If you don't want to show the number, for example with auto number attributes, just put a CSS class with display: none on the order number element in the list.

## Properties

### Class to search

The widget will look for this class to get the element that needs to be shown. This is a CSS class but there is no need to actually create it in your style.

Usually, it is best to put the class on a container rather than an individual text box because the browser will do its best to make the entire container visible. When positioning on a text box, it may very well happen that the textbox is sitting in the bottom of the viewport with the rest of the list item still out of view.

### Listen to attribute

The attribute on the context entity that has the value to look for in the list. Whenever this value changes, the widget will attempt to scroll the list. After doing so, the value is reset to zero.
