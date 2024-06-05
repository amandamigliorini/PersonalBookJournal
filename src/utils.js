// create an element, adding atributes and append children elements when needed
// type = decide the element type (body, header, main, label, input, form, h1, div, etc)
// props = object with the class, ids, href, src, alt and any other attribute for the element
// children = an array of other elements that will be children of the element to be created
export function createElement(type, props = {}, children = []) {
    //type is used to set the 
    const element = document.createElement(type);
  //Object.entries convert the object props in an array and then 
  //forEach will use each pair on the array to set the attributes of the element
    Object.entries(props).forEach(([key, value]) => {
        //if the attribute has an hyphen it will be set using set attribute, otherwise it will be set using the else code.
      if(~key.indexOf('-')) {
        element.setAttribute(key, value); 
      } else {
        element[key] = value;
      }
    });
  //because children is an array of other elements forEach will iterate through each element and append it.
  // REMEMBER: make the children array in order!!!
    children.forEach((child) => {
      element.appendChild(child);
    });
  
    return element;
  }

  export function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      res.json()
      throw { name: 'servicesError', message: jsonResponse };
    }
  }

  // retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// retrieve data from sessionStorage
export function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

// save data to session storage
export function setSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}