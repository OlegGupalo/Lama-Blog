import React, { useState } from "react";
import { Paper, Tabs, Tab } from "@mui/material";

export default function TabSwitcher({ tabs, ...props }) {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const TabContent = tabs[tab].component;

  return (
    <>
      <Paper elevation={2} style={{ marginBottom: 16 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          {...props}
        >
          {tabs.map(tab => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Paper>
      <TabContent />
    </>
  );
}
