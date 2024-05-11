type AlertVariant = "info" | "danger";

const Alert = ({
  variant,
  message,
}: {
  variant: AlertVariant;
  message: string;
}) => {
  let style = "";

  switch (variant) {
    case "info":
      style = "bg-blue-500 text-white";
      break;
    case "danger":
      style = "bg-red-500 text-white";
      break;
    default:
      style = "bg-gray-500 text-white";
  }

  return (
    <div className={`${style} rounded p-2`}>
      <span className="text-xs">{message}</span>
    </div>
  );
};

export default Alert;
