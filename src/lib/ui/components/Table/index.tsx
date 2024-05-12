import React from "react";

interface Action {
  label: string;
  callback: (data: any) => void;
}

function Table({
  data,
  actions,
}: {
  data: Array<object>;
  actions?: Array<Action>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, i) => (
              <th
                key={`header_${i}`}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td
                  key={idx}
                  className="px-6 py-4 text-gray-600 whitespace-nowrap"
                >
                  {value}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {actions.map((act, i) => (
                    <button
                      key={`act_${index}_${i}`}
                      onClick={() => act.callback(row)}
                      className="bg-gray-200 p-1"
                    >
                      {act.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
