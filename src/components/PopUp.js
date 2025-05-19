export default function PopUp({message}) {
    return(
    <div
        style={{
          position: "absolute",
          top: "15%",
          right: 0,
          marginTop: "8px",
          padding: "12px",
          backgroundColor: "#dcfce7",
          border: "1px solid #4ade80",
          color: "#166534",
          borderRadius: "4px",
          animation: "fadeOut 3s ease-in-out",
        }}
      >
        {message}
    </div>
    )
}