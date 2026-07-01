'use client'

import { useEffect } from 'react'
import { CLINIC_CONFIG } from '@/lib/config'

export default function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-gray-100"
        data-url={`${CLINIC_CONFIG.calendly.url}?hide_gdpr_banner=1&primary_color=1D9E75&hide_event_type_details=0`}
        style={{ minHeight: '700px', height: '700px' }}
      />
    </div>
  )
}
