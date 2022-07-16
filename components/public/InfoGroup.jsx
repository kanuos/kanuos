import React from "react";

export const InfoGroup = ({ items = [] }) => {
  return (
    <ul className="col-span-full flex items-start justify-between">
      {items.map(({ heading, content }, i) => (
        <li
          key={i}
          className="flex flex-col items-start gap-y-2 grow last-of-type:items-end"
        >
          <p className="opacity-50 text-xs">
            <small className="font-bold uppercase">{heading}</small>
          </p>
          {Array.isArray(content) ? (
            <ul className="text-sm flex items-start flex-col">
              {content.map((el, k) => (
                <li key={k}>
                  <small className="capitalize">{el}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">
              <small className="capitalize">{content}</small>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};
