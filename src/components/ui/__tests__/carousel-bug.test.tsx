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
  it("should NOT throw TypeError when api.canScrollPrev is missing", () => {
    expect(() => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )
    }).not.toThrow()
  })
})
