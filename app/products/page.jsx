import PublicProductsGallery from "./PublicProductGallery";

export const dynamic = "force-dynamic";

export default function ProductsPublicPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Product Gallery
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Browse our products by category.
        </p>
      </div>

      <PublicProductsGallery />
    </div>
  );
}
