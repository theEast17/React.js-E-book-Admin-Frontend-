const HomePage = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-lg font-normal tracking-tight">
            In a database, "inventory" typically refers to a structured
            collection of data about a business's goods and materials. This
            includes records of items in stock, quantities, locations, and other
            relevant details necessary for managing and tracking inventory. It
            enables efficient inventory management, monitoring stock levels, and
            supporting decision-making processes related to purchasing and
            sales.
          </h3>
          <p className="text-sm text-muted-foreground mt-3">
            You can start as soon as you add a product.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
