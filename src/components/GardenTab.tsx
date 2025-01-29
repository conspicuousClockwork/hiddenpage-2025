function GardenTab() {
  return (
    <div className="window" role="tabpanel">
        <div className="window-body" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
        }}>
            <ul className="tree-view" style={{height: "800px", width: "800px"}}>
                <li>garden</li>
            </ul>
        </div>
    </div>
  );
}

export default GardenTab;
