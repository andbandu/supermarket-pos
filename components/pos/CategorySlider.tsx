import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@/types/product";

interface CategorySliderProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategorySlider({ categories, selectedCategory, onCategorySelect }: CategorySliderProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 pb-4">
        {/* All Categories Button */}
        <Button
          variant={selectedCategory === null ? "defaultOutline" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(null)}
          className="shrink-0"
        >
          All Products
        </Button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "defaultOutline" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(category.id)}
            className="shrink-0"
          >
            {category.sinhalaName || category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}