import _ from 'lodash';

//import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import logo from './logo.svg';

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Olá', 'webpack', '!'], ' ');
    return element;
}

function imgComponent() {
    var image = new Image();
    image.src = logo;
    return image;
}

document.body.appendChild(component());
document.body.appendChild(imgComponent());