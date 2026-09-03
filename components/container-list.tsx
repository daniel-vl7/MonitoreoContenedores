"use client"

import { useState } from "react"

type FilterOption = 'all' | 'critical' | 'medium' | 'low'

const CRITICAL_THRESHOLD = 80
const MEDIUM_THRESHOLD = 50

interface Container {
  guid: string
  capacity: number
  status: 'active' | 'inactive'
  name: string
  isFavorite: boolean
  limit: number
  latitude: string
  longitude: string
  lastUpdatedClient?: string
}

interface ContainerListProps {
  containers: Container[]
}

function computeFillLevel(container: Container): number {
  if (!container.limit || container.limit === 0) return 0
  const level = (container.capacity / container.limit) * 100
  return isNaN(level) ? 0 : level
}

function getFillLevelColor(fillLevel: number): string {
  if (fillLevel > CRITICAL_THRESHOLD) return "bg-red-500"
  if (fillLevel >= MEDIUM_THRESHOLD) return "bg-yellow-500"
  return "bg-green-500"
}

function applyFilter(containers: Container[], filter: FilterOption): Container[] {
  return containers.filter((container) => {
    const fillLevel = computeFillLevel(container)
    switch (filter) {
      case 'critical':
        return fillLevel > CRITICAL_THRESHOLD
      case 'medium':
        return fillLevel >= MEDIUM_THRESHOLD && fillLevel <= CRITICAL_THRESHOLD
      case 'low':
        return fillLevel < MEDIUM_THRESHOLD
      default:
        return true
    }
  })
}

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export default function ContainerList({ containers }: ContainerListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all')

  const displayedContainers = applyFilter(containers, activeFilter).sort(
    (a, b) => computeFillLevel(b) - computeFillLevel(a)
  )

  const emptyMessage =
    activeFilter === 'all'
      ? 'No containers found'
      : `No ${activeFilter} containers found`

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
        {filterOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {displayedContainers.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {displayedContainers.map((container) => {
            const fillLevel = computeFillLevel(container)
            const colorClass = getFillLevelColor(fillLevel)
            const clampedLevel = Math.min(Math.max(fillLevel, 0), 100)
            return (
              <li key={container.guid} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{container.name}</p>
                    <p className="text-sm text-gray-500 truncate">{container.guid}</p>
                    {container.lastUpdatedClient && (
                      <p className="text-xs text-gray-400 mt-1">
                        Updated: {container.lastUpdatedClient}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="w-36">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Fill level</span>
                        <span>{Math.round(fillLevel)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${colorClass}`}
                          style={{ width: `${clampedLevel}%` }}
                        />
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        container.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {container.status}
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
