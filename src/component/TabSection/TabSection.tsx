import { Tab, Tabs } from "@mui/material"
import React, { useState } from "react"

type Props = {
    sectionName: string
    tabsStyle?: React.CSSProperties
    tabContents: Array<{
        tabContentStyle?: React.CSSProperties
        component: React.ReactNode,
        label: string
    }>
}
const TabSection = (props: Props) => {
    const [value, setValue] = useState(0)

    return (
        <React.Fragment>
            <Tabs
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                variant="scrollable"
                aria-label={props.sectionName}
                style={props.tabsStyle}
            >
                {props.tabContents.map((tabContent, index) => (
                    <Tab
                        label={tabContent.label}
                        id={`${props.sectionName}-tab-${index}`}
                        aria-controls={`${props.sectionName}-tabpanel-${index}`}
                        key={`${props.sectionName}-tab-${index}`}
                    />
                ))}
            </Tabs>
            {
                props.tabContents.map((tabContent, index) => (
                    <div
                        role="tabpanel"
                        style={tabContent.tabContentStyle}
                        hidden={value !== index}
                        id={`${props.sectionName}-tabpanel-${index}`}
                        key={`${props.sectionName}-tabpanel-${index}`}
                        aria-labelledby={`${props.sectionName}-tab-${index}`}
                    >
                        {value === index ? tabContent.component : null}
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default TabSection