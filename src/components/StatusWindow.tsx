import StatusTab from "./StatusTab";
import GardenTab from "./GardenTab";
import InventoryTab from "./InventoryTab";
import VROTab from "./VROTab";
import SettingsTab from "./SettingsTab";
import { MainTab } from "../App";

const tabs = [
  {
    value: "garden",
    label: "Z-Garden",
    component: <GardenTab />
  },
  {
    value: "status",
    label: "My Status",
    component: <StatusTab />
  },
  {
    value: "vro",
    label: "VRO Management",
    component: <VROTab />
  },
  {
    value: "inventory",
    label: "Inventory",
    component: <InventoryTab />
  },
  {
    value: "settings",
    label: "Settings",
    component: <SettingsTab />
  },
]
interface Props {
    selectedTab: MainTab | null,
    setSelectedTab: Function,
}

function StatusWindow({selectedTab, setSelectedTab}: Props) {
  return (
    <div className="window" style={{
        marginTop: "5vh",
        marginLeft: "5vw",
        marginRight: "5vw",
        height: "100%",
    }}>
        <div className="title-bar">
            <div className="title-bar-text" style={{
                paddingLeft: "5px",
                fontSize: "15px",
            }}>main</div>
        </div>
        <div className="window-body" style={{
            height: "100%",
        }}>
            <menu role="tablist">
                {
                    tabs.map((tab, i) => selectedTab?.value === tab.value || (selectedTab === null && i === 0)?
                        (<li role="tab" aria-selected="true"><a className="hp-tab-text">{tab.label}</a></li>)
                        : (<li role="tab"><a className="hp-tab-text" onClick={() => setSelectedTab(tab)} style={{ cursor: "pointer"}}>{tab.label}</a></li>)
                    )
                }
            </menu>
            {selectedTab?.component || tabs[0].component}
        </div>
    </div>
  );
}

export default StatusWindow;