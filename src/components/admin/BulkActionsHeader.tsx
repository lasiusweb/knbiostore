"use client"

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, Loader2 } from 'lucide-react';
import { exportProductsToCSV, importProductsFromCSV } from '@/actions/bulk-actions';
import { useToast } from '@/components/ui/use-toast';

export function BulkActionsHeader() {
  const [isExporting, setIsExporting] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportProductsToCSV();
      if (result.success && result.data) {
        const blob = new Blob([result.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast({ title: 'Export Successful', description: 'Product catalog exported to CSV.' });
      } else {
        toast({ title: 'Export Failed', description: result.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred during export.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      try {
        const result = await importProductsFromCSV(content);
        if (result.success) {
          toast({ title: 'Import Successful', description: result.message });
        } else {
          toast({ title: 'Import Failed', description: result.error, variant: 'destructive' });
        }
      } catch {
        toast({ title: 'Error', description: 'An unexpected error occurred during import.', variant: 'destructive' });
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleImportClick}
        disabled={isImporting}
      >
        {isImporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
        Import CSV
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
        Export CSV
      </Button>
    </div>
  );
}
