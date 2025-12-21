"use client";

import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UploadCard({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedFiles,
  setSelectedFiles,
  loading,
  onSubmit,
  fileInputRef,
}) {
  return (
    <Card className="border-dashed border-2 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5" />
          Upload Images
        </CardTitle>
        <CardDescription>
          Upload up to 10 images. If the category already exists, images will be added to it.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" type="button">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {(categories || []).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input
                ref={fileInputRef}
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                className="cursor-pointer file:text-primary"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : "Max 10 images (JPG, PNG, WebP)"}
              </p>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full md:w-auto md:ml-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
