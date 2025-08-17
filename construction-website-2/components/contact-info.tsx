"use client"

import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { trackPhoneCall, trackEmailClick, trackMapClick } from "@/lib/analytics"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <MapPin className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Our Location</h3>
          <button
            onClick={() => trackMapClick('552 S P St, Livermore, CA 94550')}
            className="text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer text-left"
          >
            552 S P St, Livermore, CA 94550
          </button>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Phone className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Phone Number</h3>
          <a 
            href="tel:(925) 899-8123"
            onClick={() => trackPhoneCall('(925) 899-8123')}
            className="text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer"
          >
            (925) 899-8123
          </a>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Email Address</h3>
          <a 
            href="mailto:Matt@solvesall.org"
            onClick={() => trackEmailClick('Matt@solvesall.org')}
            className="text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer"
          >
            Matt@solvesall.org
          </a>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Working Hours</h3>
          <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
          <p className="text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
        </div>
      </div>
    </div>
  )
}