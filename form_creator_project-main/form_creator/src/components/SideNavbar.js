import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import FeedIcon from "@mui/icons-material/Feed";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { AuthContext } from "../utils/AuthProvider";
import { baseUrl } from "../config/config";
import "../assets/Sidebar.css";

const SideNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const LogOut = async () => {
    await axios
      .post(`${baseUrl}/logout`)
      .then((response) => {
        console.log(response);
        setIsAuthenticated(null);
        navigate("/login");
      })
      .catch((error) => {});
  };
  const isActive = (path) => location.pathname === path;
  const [toggled, setToggled] = React.useState(false);

  return (
    <div className={toggled ? "sidebar-open" : ""} style={{ height: "100%" }}>
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="always"
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "#6c757d" : "#0d6efd",
                  backgroundColor: active ? "#ffffff" : undefined,
                };
            },
          }}
        >
          <div style={{ height: "6rem" }} />
          <MenuItem
            icon={<HomeWorkIcon />}
            onClick={() => navigate("/home")}
            active={isActive("/home")}
            suffix={isActive("/home") ? "🟢" : ""}
          >
            Home
          </MenuItem>
          <MenuItem
            disabled
            icon={<AccountBoxIcon />}
            active={isActive("/profile")}
            suffix={isActive("/profile") ? "🟢" : ""}
          >
            Profile
          </MenuItem>
          <SubMenu
            suffix={
              isActive("/forms/createForm") || isActive("/forms/myforms")
                ? "🟢"
                : ""
            }
            active={isActive("/forms/createForm") || isActive("/forms/myforms")}
            label="Forms"
            icon={<IntegrationInstructionsIcon />}
          >
            <MenuItem
              icon={<FeedIcon />}
              onClick={() => navigate("/forms/createForm")}
            >
              Create new form
            </MenuItem>
            <MenuItem
              icon={<ListAltIcon />}
              onClick={() => navigate("/forms/myforms")}
            >
              View my forms
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<MenuOpenIcon />}>View data</MenuItem>
          <MenuItem icon={<MenuOpenIcon />}> Examples</MenuItem>
          <div style={{ height: "6rem" }} />
          <MenuItem icon={<LogoutIcon />} onClick={LogOut}>
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ display: "flex", padding: 10 }}>
        <div>
          <button
            className="sidebar-toggle-button"
            onClick={() => setToggled(!toggled)}
          >
            {!toggled ? <MenuOpenIcon /> : <ClearIcon />}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SideNavbar;
