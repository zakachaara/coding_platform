import style from "./popup.module.css";
export default function PopUp({message,type}) {
    return(
    <div
        style={{
          position: "absolute",
          marginTop: "8px",
          padding: "12px",
          borderRadius: "4px",
          animation: "fadeOut 5s ease-in-out",
        }}
        className={style[type]}
      >
        {message}
    </div>
    )
}