import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <main className="w-full">
      <section className="top bg-dotted-spacing-4 bg-dotted-gray-200">
        <div className="flex flex-col items-center my-8 md:my-24 w-full">
          <h1 className="text-6xl font-semibold mb-4 text-center leading-tight text-gray-800">
            Video editing, <br />replaced by AI
          </h1>
          <p className="text-base sm:text-lg text-center my-8 w-full">
            Your next video editor isn’t human — and that’s the point.
          </p>
          <div className="flex items-center justify-center w-full my-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0 w-full">
              <a className="bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-md transition-colors text-center" href="/auth/login">
                Get started
              </a>
              <a className="bg-gray-200 text-gray-700 font-semibold shadow-xs hover:bg-gray-300 rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-md transition-colors text-center" href="/auth/login">
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="aspect-video relative w-full">
          <Image
            src="https://picsum.photos/800/500"
            alt="Hero Image"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col my-8 md:my-24 w-full">
          <p className="text-base sm:text-lg text-center text-gray-700 mb-4 italic">
            Multiple businesses are trusting TroqAi <br /> to create their marketing content
          </p>
          <Carousel
            opts={{ align: "start" }}
            className="w-full hidden md:block my-8 md:my-12"
          >
            <CarouselContent>
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                  <div className="p-1">
                    <p className="text-center text-base sm:text-lg font-semibold">
                      {`Partner ${index + 1}`}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col items-center my-8 md:my-16 w-full">
          <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-center">
            Everything you <br /> need, all in one place
          </h3>

          <div className="flex flex-col items-center justify-center w-full my-8">
            <button className="bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-md transition-colors my-4 cursor-pointer">
              Test it yourself
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-8 md:my-12 space-y-8 md:space-y-0">
            <div className="flex flex-col">
              <img
                src="https://picsum.photos/400/200"
                alt="Feature 1"
                className="mb-4 w-full h-40 sm:h-48 object-cover rounded-lg"
              />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Hook detection, fully automated</h4>
              <p className="text-left text-gray-700 text-sm sm:text-md">
                Troq finds the most engaging moments — intros, insights, and CTAs — using speech and tone
              </p>
            </div>

            <div className="flex flex-col">
              <img
                src="https://picsum.photos/400/200"
                alt="Feature 2"
                className="mb-4 w-full h-40 sm:h-48 object-cover rounded-lg"
              />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Clips cut & assembled by AI</h4>
              <p className="text-left text-gray-700 text-sm sm:text-md">
                We cut and stitch 3–5 viral moments into one seamless short-form video
              </p>
            </div>

            <div className="flex flex-col">
              <img
                src="https://picsum.photos/400/200"
                alt="Feature 3"
                className="mb-4 w-full h-40 sm:h-48 object-cover rounded-lg"
              />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Captions & ready-to-post output</h4>
              <p className="text-left text-gray-700 text-sm sm:text-md">
                Hardcoded subtitles + aspect ratio = scroll-stopping Shorts, Reels & TikToks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-8 md:my-12 space-y-12 md:space-y-0">
            <div className="flex flex-col col-span-1">
              <img
                src="https://picsum.photos/800"
                alt="Feature 4"
                className="hidden md:block h-full w-full object-cover rounded-lg"/>
            </div>
            <div className="flex flex-col justify-between col-span-2">
              <div>
                <p className="text-left text-gray-700 text-sm sm:text-md">
                  REAL-TIME UPDATES
                </p>
                <h4 className="text-4xl font-semibold mb-2 font-extralight">
                  Empowering your talent pipeline
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <img
                      src="https://picsum.photos/50"
                      alt={`Feature ${i + 5}`}
                      className="mb-4 h-10 w-10 rounded-lg"
                    />
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">Feature 5</h4>
                    <p className="text-left text-gray-700 text-sm sm:text-md">
                      Description of feature 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-8 md:my-12 space-y-12 md:space-y-0 ">
            <div className="flex flex-col justify-between col-span-2">
              <div>
                <p className="text-left text-gray-700 text-sm sm:text-md">
                  REAL-TIME UPDATES
                </p>
                <h4 className="text-4xl font-semibold mb-2 font-extralight">
                  Empowering your talent pipeline
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <img
                      src="https://picsum.photos/50"
                      alt={`Feature ${i + 5}`}
                      className="mb-4 h-10 w-10 rounded-lg"
                    />
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">Feature 5</h4>
                    <p className="text-left text-gray-700 text-sm sm:text-md">
                      Description of feature 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col col-span-1">
              <img
                src="https://picsum.photos/800"
                alt="Feature 4"
                className="hidden md:block h-full w-full object-cover rounded-lg"/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
