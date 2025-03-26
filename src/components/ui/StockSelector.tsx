
import React, { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronsUpDown, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Stock } from '@/models/market';
import { fetchAvailableStocks } from '@/services/marketApi';
import { allStocks } from '@/mocks/marketData'; // Fallback for development

type StockSelectorProps = {
  selectedStocks: Stock[];
  onStocksChange: (stocks: Stock[]) => void;
};

const StockSelector = ({ selectedStocks, onStocksChange }: StockSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState<Stock[]>(allStocks);
  const [loading, setLoading] = useState(false);
  
  // Fetch available stocks on component mount
  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      try {
        const availableStocks = await fetchAvailableStocks();
        if (availableStocks.length > 0) {
          setStocks(availableStocks);
        }
      } catch (error) {
        console.error("Error loading stocks:", error);
        // Fallback to local mock data if API fails
        setStocks(allStocks);
      } finally {
        setLoading(false);
      }
    };
    
    loadStocks();
  }, []);
  
  const isStockSelected = (stock: Stock) => 
    selectedStocks.some(selected => selected.symbol === stock.symbol);
  
  const toggleStock = (stock: Stock) => {
    if (isStockSelected(stock)) {
      onStocksChange(selectedStocks.filter(selected => selected.symbol !== stock.symbol));
    } else {
      onStocksChange([...selectedStocks, stock]);
    }
  };
  
  const removeStock = (symbol: string) => {
    onStocksChange(selectedStocks.filter(stock => stock.symbol !== symbol));
  };
  
  const filteredStocks = search.length > 0
    ? stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(search.toLowerCase()) || 
        stock.name.toLowerCase().includes(search.toLowerCase())
      )
    : stocks;
    
  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10"
            disabled={loading}
          >
            {loading ? "Loading stocks..." : 
              selectedStocks.length > 0 
                ? `${selectedStocks.length} stocks selected`
                : "Select stocks..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search stocks..." 
              value={search}
              onValueChange={setSearch}
              className="h-9"
            />
            <CommandEmpty>No stocks found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {filteredStocks && filteredStocks.map((stock) => (
                <CommandItem
                  key={stock.symbol}
                  value={stock.symbol}
                  onSelect={() => {
                    toggleStock(stock);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium">{stock.symbol}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{stock.name}</span>
                  </div>
                  <CheckIcon
                    className={cn(
                      "h-4 w-4",
                      isStockSelected(stock) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      {selectedStocks.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedStocks.map((stock) => (
            <Badge
              key={stock.symbol}
              variant="secondary"
              className="flex items-center gap-1 py-1 pl-2 pr-1"
            >
              <span className="font-medium">{stock.symbol}</span>
              <button
                type="button"
                onClick={() => removeStock(stock.symbol)}
                className="rounded-full hover:bg-secondary ml-1"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSelector;
