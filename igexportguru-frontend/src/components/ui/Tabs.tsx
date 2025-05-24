import React, { createContext, useContext, useState } from 'react';

interface TabsContextValue {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ 
  defaultValue = '', 
  value, 
  onValueChange, 
  children 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;
  
  const handleTabChange = (newValue: string) => {
    if (!value) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex border-b border-neutral-200 ${className}`}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const { activeTab, onTabChange } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => onTabChange(value)}
      className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
        isActive
          ? 'border-instagram-pink text-instagram-pink'
          : 'border-transparent text-neutral-500 hover:text-neutral-700'
      } ${className}`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  const { activeTab } = context;
  
  if (activeTab !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
};

export default Tabs;
export { TabsList, TabsTrigger, TabsContent }; 