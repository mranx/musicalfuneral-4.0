'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-background">
      {/* Who Are We Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6 text-foreground">Who Are We</h1>
              <p className="text-muted-foreground mb-6">
                We are a dedicated team of professionals committed to providing personalized and meaningful funeral music services. Our expertise spans across various religious denominations, ensuring that each service is conducted with the utmost respect and authenticity.
              </p>
              <p className="text-muted-foreground mb-6">
                With years of experience in funeral services and music production, we understand the importance of creating the right atmosphere for remembrance and reflection. Our AI-powered technology allows us to deliver high-quality, customized musical arrangements that honor your loved ones.
              </p>
              <p className="text-muted-foreground">
                Our mission is to provide comfort and solace during difficult times through the power of music. We believe that every life deserves to be celebrated in a way that reflects their unique journey and the impact they had on those around them.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/images/priest-praying-church 1.png"
                alt="Priest praying in church"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Respect",
                description: "We approach every service with the highest level of respect and dignity, honoring different religious and cultural traditions."
              },
              {
                title: "Compassion",
                description: "We understand the emotional nature of our work and provide caring, empathetic support throughout the process."
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, from music production to customer support."
              }
            ].map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you create a meaningful musical tribute for your loved one.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="default">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
