import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import './DnD.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const fulfillElements = (elements) => {
  return elements.map((element, index) => {
    const dndIndex =
      element && element.dndIndex ? element.dndIndex : `dnd-${index}`;
    return {
      dndIndex,
      element,
      original: element,
    };
  });
};

const DnD = ({
  id,
  elements,
  onChange,
  elementClassName,
  children: ElementRenderer,
  draggable,
}) => {
  const [dndElements, setDndElements] = useState(fulfillElements(elements));

  useEffect(() => {
    const newElements = fulfillElements(elements);
    setDndElements(newElements);
  }, [elements]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newDndElements = reorder(
      dndElements,
      result.source.index,
      result.destination.index
    );

    const newElements = newDndElements.map(({ element }) => element);

    onChange(newElements);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={id} direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="Droppable Droppable__Container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {dndElements.map(({ dndIndex, element }, index) => (
              <Draggable
                key={dndIndex}
                draggableId={dndIndex}
                index={index}
                isDragDisabled={!draggable}
              >
                {(provided, snapshot) => (
                  <div
                    className={`Draggable Draggable__Container ${elementClassName}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {ElementRenderer(element, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DnD.defaultProps = {
  id: `dnd-droppable-${Math.ceil(Math.random() * 100)}`,
  elementClassName: `Draggable--default`,
  draggable: true,
};

DnD.propTypes = {
  id: PropTypes.string,
  elementClassName: PropTypes.string,
  draggable: PropTypes.bool,
  elements: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default DnD;
