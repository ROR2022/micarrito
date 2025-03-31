import { Container } from "@/components/container";
import { VehicleFilters } from "./components/vehicle-filters";
import { VehicleGrid } from "./components/vehicle-grid";

export default function VehiclesPage() {
  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Encuentra tu vehículo ideal</h1>
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div>
            <VehicleFilters />
          </div>
          <div>
            <VehicleGrid />
          </div>
        </div>
      </Container>
    </div>
  );
} 