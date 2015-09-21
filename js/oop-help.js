// This way of inheriting is suggested to make it "cleaner" when writing
// subclasses.
// http://javascript.info/tutorial/pseudo-classical-pattern
function extend(Child, Parent) {
    Child.prototype = inherit(Parent.prototype)
    Child.prototype.constructor = Child
    Child.parent = Parent.prototype
}
function inherit(proto) {
    function F() { }
    F.prototype = proto
    return new F
}
