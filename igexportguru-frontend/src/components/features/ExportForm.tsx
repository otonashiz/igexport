import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { validateInstagramInput, extractUsername } from '@/utils/validation';
import { APP_CONFIG } from '@/utils/constants';
import useExportStore from '@/stores/exportStore';
import DataPreview from './DataPreview';
import type { ExportType } from '@/types/instagram';

const ExportForm: React.FC = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [activeTab, setActiveTab] = useState('export');
  
  const {
    username,
    exportType,
    isLoading,
    setUsername,
    setExportType,
    setError,
  } = useExportStore();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const validation = validateInstagramInput(value);
      if (!validation.isValid) {
        setInputError(validation.error || '');
      } else {
        setInputError('');
        const cleanUsername = validation.cleanValue || extractUsername(value);
        if (cleanUsername) {
          setUsername(cleanUsername);
        }
      }
    } else {
      setInputError('');
      setUsername('');
    }
  }, [setUsername]);

  const handleExportTypeChange = useCallback((type: ExportType) => {
    setExportType(type);
  }, [setExportType]);

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) {
      setInputError(t('validation.usernameRequired'));
      return;
    }

    const validation = validateInstagramInput(inputValue);
    if (!validation.isValid) {
      setInputError(validation.error || '');
      return;
    }

    const cleanUsername = validation.cleanValue || extractUsername(inputValue);
    if (!cleanUsername) {
      setInputError(t('validation.invalidUsername'));
      return;
    }

    setInputError('');
    setError(null);
    
    // 切换到预览tab
    setActiveTab('preview');
    
    console.log('开始导出:', { username: cleanUsername, type: exportType });
  }, [inputValue, exportType, setError, t]);

  return (
    <section className="py-8 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="ig-gradient-text">IGExportGuru</span>
          </h1>
          <p className="text-neutral-600">
            Export Instagram followers & following lists to Excel
          </p>
        </div>
        
        <Card variant="elevated" padding="none">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="export">Export Data</TabsTrigger>
              <TabsTrigger value="preview">Data Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="export" className="p-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Input
                    placeholder={t('export.inputPlaceholder')}
                    value={inputValue}
                    onChange={handleInputChange}
                    error={inputError}
                    leftIcon={<i className="fas fa-at"></i>}
                    size="lg"
                    label={t('export.inputLabel')}
                    hint="Enter a public Instagram username or profile URL"
                  />

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Export Type
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="exportType"
                          value="followers"
                          checked={exportType === 'followers'}
                          onChange={() => handleExportTypeChange('followers')}
                          className="h-4 w-4 text-instagram-pink border-neutral-300 focus:ring-instagram-pink focus:ring-2"
                        />
                        <div className="ml-3 flex items-center">
                          <i className="fas fa-users text-neutral-400 mr-2"></i>
                          <div>
                            <span className="text-sm font-medium text-neutral-900">
                              {t('export.followers')}
                            </span>
                            <p className="text-sm text-neutral-500">
                              People who follow this account
                            </p>
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="exportType"
                          value="following"
                          checked={exportType === 'following'}
                          onChange={() => handleExportTypeChange('following')}
                          className="h-4 w-4 text-instagram-pink border-neutral-300 focus:ring-instagram-pink focus:ring-2"
                        />
                        <div className="ml-3 flex items-center">
                          <i className="fas fa-user-plus text-neutral-400 mr-2"></i>
                          <div>
                            <span className="text-sm font-medium text-neutral-900">
                              {t('export.following')}
                            </span>
                            <p className="text-sm text-neutral-500">
                              People this account follows
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                    <p className="text-xs text-neutral-500 mt-3">
                      Select whether to export followers or accounts being followed
                    </p>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!username || !!inputError || isLoading}
                    loading={isLoading}
                    size="lg"
                    fullWidth
                    leftIcon={<i className="fas fa-download"></i>}
                  >
                    {isLoading ? t('export.progress', { progress: 0 }) : t('export.exportButton', { maxCount: APP_CONFIG.maxExportCount })}
                  </Button>

                  <div className="text-center text-sm text-neutral-500 space-y-2">
                    <p>
                      <i className="fas fa-info-circle mr-1"></i>
                      Only public Instagram accounts can be exported
                    </p>
                    <p>
                      <i className="fas fa-shield-alt mr-1"></i>
                      {t('export.securityNote')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="preview" className="p-0">
              <DataPreview />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default ExportForm; 