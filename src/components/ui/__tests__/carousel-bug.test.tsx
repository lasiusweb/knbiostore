import * as React from "react"
import { render, screen, act } from "@testing-library/react"
import { Carousel, CarouselContent, CarouselItem } from "../carousel"

// Mock embla-carousel-react
jest.mock("embla-carousel-react", () => {
  return jest.fn(() => [
    (node: HTMLElement) => {}, // carouselRef
    { // api
      on: jest.fn(),
      off: jest.fn(),
      canScrollPrev: undefined, // Missing intentionally to reproduce the bug
      canScrollNext: undefined,
    }
  ])
})

describe("Carousel Bug Reproduction", () => {
  it("should throw TypeError when api.canScrollPrev is missing", () => {
    // We expect it to throw during render/useEffect
    // But since it's inside useEffect, it might just log to console or crash the test runner
    
    // Silence console.error for the expected crash
    const spy = jest.spyOn(console, "error").mockImplementation(() => {})

    expect(() => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
    }).toThrow(/api.canScrollPrev is not a function/)

    spy.mockRestore()
  })
})
