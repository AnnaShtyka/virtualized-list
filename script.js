const container = document.querySelector('.container');

const boundingRect = container.getBoundingClientRect();

const options = {
  itemHeight: 100,
  countOfItems: 3,
  count: [0, 10],
  scrollPosition: 0
};

const createStaticElement = () => {
  for(let i = 1; i <= 10; i++) {
    const elem = document.createElement('div');
    elem.className = 'item';
    elem.textContent = i ;
    container.append(elem);
  }
};
createStaticElement();

const createDynamicElement = (item) => {
  const element = document.createElement('div');
    element.className = 'item';
    element.textContent = item
    container.append(element)
};

const addItems = () => {
  for (let i = 0; i < options.countOfItems; i++) {
    options.count[0]++;
    options.count[1]++;
    createDynamicElement(options.count[1])
  }
};

const prependItems = () => {
  for (let i = 0; i < options.countOfItems; i++) {
    options.count[0]--;
    options.count[1]--;
    if (count[0] > 0) {
      createDynamicElement(options.count[0])
      container.children.length > 12 &&
      container.removeChild(container.children[container.children.length - 1]);
    }
  };
};

let handleScroll = event => {
  const prepanded = toUpScroll(event);
  if (!prepanded) {
    toDownScroll(event);
  }if (prepanded && container.scrollTop === 0) {
    container.scrollBy(0, 1);
  }
  options.scrollPosition = container.scrollTop;
};

const toUpScroll = event => {
  if (options.scrollPosition < container.scrollTop) {
    return false;
  }
  const addToStart = addItemsToStart(event.target.scrollTop);
  if (addToStart) {
    prependItems(event.target);
  }
  return addToStart;
};

const toDownScroll = event => {
  if (options.scrollPosition > container.scrollTop) {
    return false;
  }  
  const addToEnd = addItemsToEnd(event.target.scrollTop, event.target.scrollHeight);
  if (addToEnd) {
    addItems(event.target);
  }
  return addToEnd;
};

const addItemsToEnd = (scrollTop, scrollHeight) =>
  scrollTop + boundingRect.height + options.itemHeight > scrollHeight;

const addItemsToStart = scrollTop => scrollTop < options.itemHeight * 2;

container.addEventListener("scroll", handleScroll, true);
