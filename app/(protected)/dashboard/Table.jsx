import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import DashboardTable from "./DashboardTable";
import TimelineForm from "./TimeLineForm";

export default function Table(){
  return (
    <div>
      <Tabs defaultValue="products" aria-label="Main tabs">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <DashboardTable />
        </TabsContent>

        <TabsContent value="timeline">
          <TimelineForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
