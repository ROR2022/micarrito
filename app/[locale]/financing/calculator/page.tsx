"use client";

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Calculator, Car, Calendar, Percent, DollarSign, Share, Download, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface LoanDetails {
  vehiclePrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export default function FinancingCalculatorPage() {
  const { toast } = useToast();
  
  // Estados para los valores de los sliders e inputs
  const [vehiclePrice, setVehiclePrice] = useState(250000);
  const [downPayment, setDownPayment] = useState(50000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(48);
  const [interestRate, setInterestRate] = useState(12.9);
  
  // Estado para los resultados calculados
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    vehiclePrice: vehiclePrice,
    downPayment: downPayment,
    loanTerm: loanTerm,
    interestRate: interestRate,
    monthlyPayment: 0,
    totalInterest: 0,
    totalCost: 0
  });

  // Planes predefinidos
  const financingPlans = [
    { name: "Estándar", interestRate: 12.9, minDownPayment: 20 },
    { name: "Premium", interestRate: 10.5, minDownPayment: 15 },
    { name: "Seminuevos", interestRate: 14.9, minDownPayment: 25 }
  ];

  // Calcular el pago mensual
  const calculateMonthlyPayment = (principal: number, term: number, rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  // Calcular detalles del préstamo
  const calculateLoanDetails = () => {
    // Asegurar que el vehiclePrice y downPayment sean números válidos
    const priceValue = vehiclePrice || 0;
    const downValue = downPayment || 0;
    
    // Calcular el monto principal del préstamo
    const loanAmount = priceValue - downValue;
    
    // Verificar que el principal sea positivo
    if (loanAmount <= 0) {
      return {
        vehiclePrice: priceValue,
        downPayment: downValue,
        loanTerm: loanTerm,
        interestRate: interestRate,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: priceValue
      };
    }
    
    // Calcular el pago mensual
    const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, interestRate);
    
    // Calcular el costo total de intereses
    const totalPayments = monthlyPayment * loanTerm;
    const totalInterest = totalPayments - loanAmount;
    
    // Calcular el costo total del vehículo (precio + intereses)
    const totalCost = priceValue + totalInterest;
    
    return {
      vehiclePrice: priceValue,
      downPayment: downValue,
      loanTerm: loanTerm,
      interestRate: interestRate,
      monthlyPayment,
      totalInterest,
      totalCost
    };
  };

  // Effect para actualizar el porcentaje de enganche cuando cambie el monto
  useEffect(() => {
    if (vehiclePrice > 0) {
      const newPercent = (downPayment / vehiclePrice) * 100;
      setDownPaymentPercent(parseFloat(newPercent.toFixed(1)));
    }
  }, [downPayment, vehiclePrice]);

  // Effect para calcular el préstamo cuando cambien los valores
  useEffect(() => {
    const details = calculateLoanDetails();
    setLoanDetails(details);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [vehiclePrice, downPayment, loanTerm, interestRate]);

  // Manejar cambios en el porcentaje de enganche
  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0];
    setDownPaymentPercent(percent);
    const newDownPayment = Math.round((percent / 100) * vehiclePrice);
    setDownPayment(newDownPayment);
  };

  // Manejar cambios directos en el monto de enganche
  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDownPayment(value);
    } else {
      setDownPayment(0);
    }
  };

  // Aplicar un plan de financiamiento predefinido
  const applyFinancingPlan = (plan: { name: string, interestRate: number, minDownPayment: number }) => {
    setInterestRate(plan.interestRate);
    
    // Asegurar que el enganche cumpla con el mínimo requerido del plan
    const minDownPaymentAmount = (plan.minDownPayment / 100) * vehiclePrice;
    if (downPayment < minDownPaymentAmount) {
      setDownPayment(minDownPaymentAmount);
      setDownPaymentPercent(plan.minDownPayment);
    }
    
    toast({
      title: `Plan ${plan.name} aplicado`,
      description: `Tasa de interés: ${plan.interestRate}%, Enganche mínimo: ${plan.minDownPayment}%`,
      duration: 3000,
    });
  };

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <Link href="/financing" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Volver a Financiamiento
          </Link>
          <h1 className="text-3xl font-bold mb-2">Calculadora de Financiamiento</h1>
          <p className="text-muted-foreground">
            Calcula y personaliza tu plan de financiamiento para encontrar la mejor opción para tu presupuesto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna de cálculos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" /> Parámetros del financiamiento
                </CardTitle>
                <CardDescription>
                  Ajusta los valores para calcular tu plan de financiamiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Precio del vehículo */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="vehicle-price" className="flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      Precio del vehículo
                    </Label>
                    <div className="font-medium">
                      ${vehiclePrice.toLocaleString()}
                    </div>
                  </div>
                  <Slider
                    id="vehicle-price"
                    min={50000}
                    max={1000000}
                    step={5000}
                    defaultValue={[vehiclePrice]}
                    onValueChange={(values) => setVehiclePrice(values[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$50,000</span>
                    <span>$1,000,000</span>
                  </div>
                </div>

                {/* Enganche */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="down-payment" className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Enganche
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="down-payment-value"
                        value={downPayment}
                        onChange={handleDownPaymentChange}
                        className="w-24 text-right"
                      />
                      <span className="font-medium">({downPaymentPercent}%)</span>
                    </div>
                  </div>
                  <Slider
                    id="down-payment"
                    min={0}
                    max={50}
                    step={1}
                    defaultValue={[downPaymentPercent]}
                    value={[downPaymentPercent]}
                    onValueChange={handleDownPaymentPercentChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Plazo del préstamo */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="loan-term" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Plazo del préstamo
                    </Label>
                    <div className="font-medium">
                      {loanTerm} meses ({Math.floor(loanTerm / 12)} años)
                    </div>
                  </div>
                  <Slider
                    id="loan-term"
                    min={12}
                    max={72}
                    step={12}
                    defaultValue={[loanTerm]}
                    onValueChange={(values) => setLoanTerm(values[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12 meses</span>
                    <span>72 meses</span>
                  </div>
                </div>

                {/* Tasa de interés */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interest-rate" className="flex items-center">
                      <Percent className="h-4 w-4 mr-2" />
                      Tasa de interés anual
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="interest-rate-value"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                        className="w-20 text-right"
                        step="0.1"
                      />
                      <span className="font-medium">%</span>
                    </div>
                  </div>
                  <Slider
                    id="interest-rate"
                    min={5}
                    max={20}
                    step={0.1}
                    defaultValue={[interestRate]}
                    value={[interestRate]}
                    onValueChange={(values) => setInterestRate(values[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col">
                <div className="text-sm text-muted-foreground mb-4">
                  Aplica uno de nuestros planes predefinidos:
                </div>
                <div className="flex flex-wrap gap-2">
                  {financingPlans.map((plan) => (
                    <Button 
                      key={plan.name} 
                      variant="outline" 
                      size="sm"
                      onClick={() => applyFinancingPlan(plan)}
                    >
                      Plan {plan.name}
                    </Button>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Columna de resultados */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen de tu financiamiento</CardTitle>
                <CardDescription>
                  Resultados basados en los parámetros actuales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Resultado principal: Pago mensual */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Tu pago mensual estimado</div>
                  <div className="text-4xl font-bold text-primary">
                    ${Math.round(loanDetails.monthlyPayment).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    por {loanTerm} meses
                  </div>
                </div>

                {/* Detalles del préstamo */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Precio del vehículo:</span>
                    <span>${loanDetails.vehiclePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Enganche ({downPaymentPercent}%):</span>
                    <span>${loanDetails.downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monto a financiar:</span>
                    <span>${(loanDetails.vehiclePrice - loanDetails.downPayment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interés total:</span>
                    <span>${Math.round(loanDetails.totalInterest).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Costo total (precio + interés):</span>
                    <span>${Math.round(loanDetails.totalCost).toLocaleString()}</span>
                  </div>
                </div>

                {/* Visualización de la distribución de pagos */}
                <div>
                  <div className="text-sm font-medium mb-2">Distribución de pagos</div>
                  <div className="h-4 w-full rounded-full overflow-hidden bg-muted flex">
                    <div 
                      className="bg-primary h-full"
                      style={{ width: `${(loanDetails.vehiclePrice / loanDetails.totalCost) * 100}%` }}
                    />
                    <div 
                      className="bg-primary/40 h-full"
                      style={{ width: `${(loanDetails.totalInterest / loanDetails.totalCost) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                      <span>Principal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary/40 mr-1"></div>
                      <span>Intereses</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button className="w-full">
                  Solicitar este financiamiento
                </Button>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Tabla de amortización */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Tabla de amortización</h2>
          <p className="text-muted-foreground mb-6">
            Desglose detallado de tus pagos a lo largo del tiempo
          </p>

          <Tabs defaultValue="annual" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="annual">Resumen anual</TabsTrigger>
              <TabsTrigger value="monthly">Desglose mensual</TabsTrigger>
            </TabsList>
            <TabsContent value="annual" className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border border-border">Año</th>
                    <th className="text-left p-3 border border-border">Pago anual</th>
                    <th className="text-left p-3 border border-border">Principal pagado</th>
                    <th className="text-left p-3 border border-border">Interés pagado</th>
                    <th className="text-left p-3 border border-border">Balance restante</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(loanTerm / 12) }).map((_, yearIndex) => {
                    const year = yearIndex + 1;
                    const monthsInYear = year * 12 <= loanTerm ? 12 : loanTerm % 12;
                    const yearlyPayment = loanDetails.monthlyPayment * monthsInYear;
                    
                    // Cálculos simplificados para la demostración
                    const principal = loanDetails.vehiclePrice - loanDetails.downPayment;
                    const yearsTotal = loanTerm / 12;
                    const principalPaid = principal / yearsTotal;
                    const interestPaid = yearlyPayment - principalPaid;
                    const balanceRemaining = principal - (principalPaid * year);

                    return (
                      <tr key={year} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3 border-x border-border">{year}</td>
                        <td className="p-3 border-x border-border">${Math.round(yearlyPayment).toLocaleString()}</td>
                        <td className="p-3 border-x border-border">${Math.round(principalPaid).toLocaleString()}</td>
                        <td className="p-3 border-x border-border">${Math.round(interestPaid).toLocaleString()}</td>
                        <td className="p-3 border-x border-border">${Math.max(0, Math.round(balanceRemaining)).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="text-center p-8 border border-dashed rounded-md">
                <h3 className="text-lg font-medium mb-2">Vista mensual disponible al solicitar</h3>
                <p className="text-muted-foreground">
                  Para ver el desglose mensual completo de tu plan de financiamiento, 
                  por favor solicita una pre-aprobación.
                </p>
                <Button className="mt-4">Solicitar pre-aprobación</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Nota legal */}
        <div className="mt-10 text-xs text-muted-foreground border-t pt-4">
          <p>
            <strong>Descargo de responsabilidad:</strong> Esta calculadora proporciona estimaciones basadas en la 
            información proporcionada. Los resultados son aproximados y pueden variar. Las tasas de interés, 
            términos y aprobación final están sujetos a evaluación crediticia. No constituye una oferta de 
            financiamiento. Consulta con nuestro equipo financiero para obtener una cotización personalizada.
          </p>
        </div>
      </Container>
    </div>
  );
} 