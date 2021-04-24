export class Node {
    constructor() {
        this._initElement();    //Create element: div, img, ...
        this._x = 0;    //Position x (left)
        this._y = 0;    //Position y (top)
        this._width = 0;    //Width
        this._height = 0;   //Height
        this._active = true;    //Clickable?
        this.children = [];
        this._scaleX = 1;
        this._scaleY = 1;
        this._opacity = 1;
        this._zIndex = 1;
    }



    _initElement() {
        this.elm = document.createElement("div");
        this.elm.node = this;
        this.elm.style.position = "absolute";
    }

    get scaleY() {return this.scaleY;}
    set scaleY(value) {this.elm.style.transform = `scaleY(${this._scaleY})`;}

    get opacity() {return this._opacity;}
    set opacity(value) {this._opacity = value; this.elm.style.opacity = this._opacity;}

    get zIndex() {return this._zIndex;}
    set zIndex(value) {this._zIndex = value; this.elm.style.zIndex = this._zIndex;}

    get scaleX(){return this._scaleX;}
    set scaleX(value) {this._scaleX = value; this.elm.style.transform = `scaleX(${this._scaleX})`;}

    //Get, set properties
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "px";
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "px";
    }
    
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.elm.style.width = this._width==='auto'? this._width: this._width + "px";
    }

    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.elm.style.height = this._height + "px";
    }

    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
        this.elm.style.display = this._active ? "block" : "none";
    }   

    addChild(node) {
        this.elm.appendChild(node.elm);
        this.children.push(node);
    }

    on(event, listener) {
        this.elm.addEventListener(event, listener);
    }
}