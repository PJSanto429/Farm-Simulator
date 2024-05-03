import React, { useState } from 'react'
import "./index.css"

export interface TabProp {
    label: string,
    content: React.ReactNode
}
interface TabsProps {
    tabs: TabProp[]
}

export const Tab: React.FC<{
    label: string
    onClick: () => void
    isActive: boolean
}> = ({
    label, onClick, isActive
}) => (
    <button
        className={isActive ? "active tabButton" : "tabButton"}
        onClick={onClick}
    >
        {label}
    </button>
)

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0)
    
    return (
        <div className='tabsMain'>
            <div className="tabs-buttons">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        onClick={() => setActiveTab(index)}
                        isActive={index === activeTab}
                    />
                ))}
            </div>

            <div className="tab-content">
                {tabs[activeTab].content}
            </div>

        </div>
    )
}
