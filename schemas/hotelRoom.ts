import { defineField } from "sanity";

const roomTypes = [
  { title: "Basic", value: "basic" },
  { title: "Luxury", value: "luxury" },
  { title: "Suite", value: "suite" },
];

const hotelRoom = {
  name: "hotelRoom",
  title: "Hotel Room",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("maximum length is 50 characters"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "description",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(100).error("minimum length is 100 characters"),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",

      validation: (Rule) =>
        Rule.required().min(100).error("minimum price is 100 USD"),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "url",
              type: "url",
              title: "URL",
            },
            { name: "file", type: "file", title: "File" },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(3).error("minimum of three images required"),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        { name: "url", type: "url", title: "URL" },
        { name: "file", type: "file", title: "FILE" },
      ],
      validation: (Rule) => Rule.required().error("cover image is required "),
    }),
    defineField({
      name: "type",
      title: "Room Type",
      type: "string",
      options: {
        list: roomTypes,
      },
      initialValue: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialNote",
      title: " Special Note",
      type: "text",
      validation: (Rule) => Rule.required(),
      initialValue:
        "Check-in time is 12:00 PM, checkout time is 11:58 AM. If you leave behind any items, please contact the eceptionist.",
    }),
    defineField({
      name: "dimension",
      title: "Dimension",
      type: "string",
    }),
    defineField({
      name: "numberofbeds",
      title: "Number of Beds",
      type: "number",
      validation: (Rule) => Rule.min(1),
      initialValue: 1,
    }),
    defineField({
      name: "offeredAmenities",
      title: "Offered of amenities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              type: "string",
              title: "Icon",
            },
            { name: "amenity", type: "string", title: "Amenity" },
          ],
        },
      ],
    }),
    defineField({
      name: "isBooked",
      title: "Is Booked",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "review" }],
    }),
  ],
};

export default hotelRoom;
