import { el, setChildren } from "redom";
import "./main.scss";


const header = el("header", { class: "page-header" }, [
	el("div", { class: "page-header-text" }, "drag & drop example"),
	el("ul", { class: "task__list" },
		el("li",{ class: "task__item"},"item1" ),
		el("li",{ class: "task__item"},"item2" ),
		el("li",{ class: "task__item"},"item3" ),
		el("li",{ class: "task__item"},"item4" ),
	),
]);

setChildren(window.document.body, [header]);


const tasksListElement = document.querySelector(`.task__list`);
const taskElements = tasksListElement.querySelectorAll(`.task__item`);

for (const task of taskElements) {
	task.draggable = true;
}

tasksListElement.addEventListener(`dragstart`, (evt) => {
	evt.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (evt) => {
	evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
	const currentElementCoord = currentElement.getBoundingClientRect();
	const currentElementCenter =
		currentElementCoord.y + currentElementCoord.height / 2;

	const nextElement =
		cursorPosition < currentElementCenter
			? currentElement
			: currentElement.nextElementSibling;

	return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
	evt.preventDefault();

	const activeElement = tasksListElement.querySelector(`.selected`);
	const currentElement = evt.target;
	const isMoveable =
		activeElement !== currentElement &&
		currentElement.classList.contains(`task__item`);

	if (!isMoveable) {
		return;
	}

	const nextElement = getNextElement(evt.clientY, currentElement);

	  if (
			(nextElement &&
				activeElement === nextElement.previousElementSibling) ||
			activeElement === nextElement
		) {
			return;
		}

	tasksListElement.insertBefore(activeElement, nextElement);
});


