import Button from "@mui/material/Button";

export function Badge({ word, onClick, isSelected }: any) {
  return (
    <Button
      className="border-[1px] border-solid font-semibold"
      onClick={() => onClick()}
      variant="contained"
      sx={{
        marginRight: "7px",
        marginBottom: "10px",
        padding: "3px 20px",
        borderRadius: "20px",
        boxShadow: "none",
        background: "white",
        border: "solid",
        color: isSelected ? "#169A00" : "#495057",
        borderColor: isSelected ? "#169A00" : "#CED4DA",
        "&:hover": {
          backgroundColor: "#E4F7EF",
        },
      }}
    >
      {word}
    </Button>
  );
}
