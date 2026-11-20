/*
 * A card component for displaying information about an event.  Input
 * props are strings, and a few of them are flexible, e.g. `day` could be a
 * day of the week like "Wednesday", or it could be a specific date like
 * "June 10, 2026".
 */

import { type ReactNode } from "react"
import dayjs from "dayjs"
import CustomParseFormat from "dayjs/plugin/customParseFormat"
import { MdAccessTime, MdOutlineInfo, MdOutlineLocationOn, MdVideocam } from "react-icons/md"

dayjs.extend(CustomParseFormat)

export default function EventCard({
  day,
  start,
  end,
  location,
  videoConferenceLink,
  extraInfo,
  locationLink,
  headingContent,
  footerContent,
  small
} : {
    day: string,
    start: string,
    end?: string | null,
    location?: string | null,
    videoConferenceLink?: string | null,
    extraInfo?: string | null,
    locationLink?: string | null,
    headingContent?: ReactNode | null,
    footerContent?: ReactNode | null,
    small?: boolean
}) {
    const startTime = dayjs(start, "HH:mm:ss").format("h:mm a")
    const endTime = end && dayjs(end, "HH:mm:ss").format("h:mm a")

    return (
        <div className={`
            flex gap-4 bg-base-100 rounded-sm border border-base-300
            ${small ? "p-4" : "p-6"}
        `}>
            {headingContent && <div>{headingContent}</div>}
            <div className="flex flex-col gap-1">
                <h3 className={`
                    font-semibold
                    ${small ? "text-base" : "text-lg"}
                `}>
                    {day}
                </h3>
                <div className={`
                    flex items-center gap-2
                    ${small ? "text-xs" : "text-sm"}
                `}>
                    <p className="grow-0"><MdAccessTime /></p>
                    <p>{startTime}{endTime && <> &ndash; {endTime}</>}</p>
                </div>
                <div className="flex items-center gap-4">
                    {location && (
                        <div className={`
                            flex items-center gap-2
                            ${small ? "text-xs" : "text-sm"}
                        `}>
                            <p className="grow-0"><MdOutlineLocationOn /></p>
                            <p>{locationLink ? (
                                <a
                                    className="link"
                                    href={locationLink}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    {location}
                                </a>
                            ) : location}</p>
                        </div>
                    )}
                    {videoConferenceLink && (
                        <a
                            href={videoConferenceLink}
                            className="btn btn-outline btn-xs"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <span className="text-base"><MdVideocam /></span> Join
                        </a>
                    )}
                </div>
                {extraInfo && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <p className="grow-0 ml-0.5"><MdOutlineInfo /></p>
                        <p>{extraInfo}</p>
                    </div>
                )}
                {footerContent && <div>{footerContent}</div>}
            </div>
        </div>
    )
}

export function EventCardSkeleton({
    small,
    heading
}: {
    small?: boolean,
    heading?: boolean
}) {
    return (
        <div className={`
            flex gap-2 bg-base-100 rounded-sm border border-base-300
            ${heading ? "min-w-64" : "min-w-48"}
            ${small ? "p-4" : "p-6"}
        `}>
            {heading && (
                <div className="flex-3">
                    <div className="skeleton h-3 w-3/4"></div>
                </div>
            )}
            <div className="flex-5 flex flex-col gap-2">
                <div className={`skeleton w-3/4 ${small ? "h-4" : "h-6"}`}></div>
                <div className={`skeleton w-1/2 ${small ? "h-2" : "h-4"}`}></div>
                <div className={`skeleton w-2/3 ${small ? "h-2" : "h-4"}`}></div>
            </div>
        </div>
    )
}
