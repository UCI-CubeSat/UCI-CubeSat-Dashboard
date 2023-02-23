import Logo from "../Logo/logo";
import { appBarHeight } from "./HeaderUtils";

export default function Header() {
    return (
        <div
            style={{
                width: "100vw",
                height: appBarHeight,
                backgroundColor: "#4f46e5",
                display: "flex"
            }}
        >
            <div
                style={{
                    flexGrow: "1"
                }}
            >
                <Logo style={{
                    height: "100%",
                    width: "150px",
                    objectFit: "cover",
                    padding: "8px"
                }} />
            </div>
        </div>
    )
}