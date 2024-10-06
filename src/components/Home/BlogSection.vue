<script setup>
const posts = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-vector/computer-with-neon-lights-computer-with-neon-lights-laptop-with-neon-light-black-background_912214-47900.jpg",
    title: "How to pick the best components",
    href: "#",
    description:
      "In this blog post, we guide you through the process of selecting the right components for your PC build. We cover the key factors to consider, such as compatibility between parts, performance requirements based on your usage (gaming, editing, or general tasks), and budget management. By breaking down each component category, from CPUs and GPUs to RAM and storage, this post will help you make informed decisions and build a system that meets your specific needs.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Components", href: "#" },
  },
  {
    id: 2,
    image:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/f519e7c6-4de8-43a7-9562-9b9cf5ebada1/0fccc758-58cf-4d18-b9fc-a90a3da56ba0.png",
    title: "Upgrade your build to another level",
    href: "#",
    description:
      "In this blog post, we explore the exciting world of upgrading your PC build to take your performance to the next level. Whether you're looking to enhance gaming experiences, speed up content creation, or improve multitasking capabilities, we provide actionable tips and insights. Learn about the most impactful upgrades, such as adding more RAM, switching to a solid-state drive (SSD) for faster load times, or upgrading your graphics card for stunning visuals. We also discuss the importance of optimizing cooling solutions and power supplies to support your new components. With our expert advice, you'll be equipped to make informed choices that transform your setup into a powerhouse of performance and efficiency.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Builds", href: "#" },
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/a5/28/74/a52874a5cb8dc3d5a2f245f00fa56874.jpg",
    title: "Our recommendations",
    href: "#",
    description:
      "In this blog post, we provide general recommendations to enhance your overall tech setup. Whether you're building a PC, upgrading peripherals, or optimizing your workspace, we've got you covered. From high-performance components to ergonomic chairs and high-quality monitors, we suggest products that improve both productivity and comfort. We also recommend essential accessories, like mechanical keyboards, precision mice, and advanced cooling solutions. Whether you're a gamer, creative professional, or working from home, our curated list ensures you have the tools to create an efficient, powerful, and enjoyable environment for all your tasks.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Components", href: "#" },
  },
];
</script>

<template>
  <div class="bg-white pt-20 pb-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-full lg:mx-0 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          From the blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600 pb-20">
          Learn how to do your build with our expert advice.
        </p>
      </div>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="flex max-w-xl flex-col items-start justify-between"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none group-hover:opacity-85 lg:h-80"
          >
            <img
              :src="post.image"
              alt="product.imageAlt"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full transform transition duration-500 ease-in-out hover:scale-110"
            />
          </div>
          <div class="mt-3 flex items-center gap-x-4 text-xs">
            <time :datetime="post.datetime" class="text-gray-500">{{
              post.date
            }}</time>
            <a
              :href="post.category.href"
              class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >{{ post.category.title }}</a
            >
          </div>
          <div class="group relative">
            <h3
              class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
            >
              <a :href="post.href">
                <span class="absolute inset-0" />
                {{ post.title }}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {{ post.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
