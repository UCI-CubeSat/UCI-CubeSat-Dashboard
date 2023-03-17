import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import { IconButton, Typography } from "@mui/material";
export default function Footer() {
    return (
        <div
            style={{
                padding: "8px",
                width: "100vw",
                backgroundColor: "black",
                height: "200px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <div style={{ width: "100%" }}>
                <Typography align='center' variant='h4'>
                    UCI Cubesat
                </Typography>
            </div>
            <div>
                <IconButton
                    href='https://projects.eng.uci.edu/projects/2022-2023/uci-cubesat'
                    color="inherit"
                >
                    <WebIcon />
                </IconButton>
                <IconButton
                    href='https://www.instagram.com/ucicubesat/?igshid=YmMyMTA2M2Y%3D'
                    color="inherit"
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    href='https://www.linkedin.com/company/uci-cubesat/'
                    color="inherit"
                >
                    <LinkedInIcon />
                </IconButton>
            </div>
        </div>

    )
}