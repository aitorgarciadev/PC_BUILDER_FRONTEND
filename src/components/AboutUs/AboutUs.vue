<script setup>
const posts = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-vector/computer-with-neon-lights-computer-with-neon-lights-laptop-with-neon-light-black-background_912214-47900.jpg",
    title: "How to Pick the Best Components",
    href: "#",
    description:
      "Building your own PC can seem overwhelming, but with the right guidance, the process becomes much simpler. The key is finding the perfect balance between performance, compatibility, and budget. \n\nFirst, make sure that the components you choose are compatible with each other. The processor (CPU) must work with the motherboard, so check the socket type and chipset. Also, ensure that the RAM is compatible with the motherboard in terms of speed and type. \n\nSecond, your usage will determine the most important components. For gamers, a good graphics card (GPU) and a powerful processor are crucial. If you're doing video editing or other heavy tasks, focus on a high-core-count CPU and plenty of RAM. \n\nFinally, your budget plays a huge role. Plan your spending by focusing on the most important parts, and save where you can on less critical components. By following these guidelines, you'll be well on your way to building a system that meets your specific needs without breaking the bank.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Components", href: "#" },
  },
  {
    id: 2,
    image:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/f519e7c6-4de8-43a7-9562-9b9cf5ebada1/0fccc758-58cf-4d18-b9fc-a90a3da56ba0.png",
    title: "Upgrade Your Build to Another Level",
    href: "#",
    description:
      "Taking your PC to the next level isn't just about adding more expensive parts; it's about understanding which upgrades will give you the biggest performance boost. Whether you're a gamer, a content creator, or just looking for better overall performance, here are some key upgrades to consider. \n\nOne of the most impactful upgrades is increasing your RAM. More memory means better multitasking and smoother performance when running multiple programs. Another major improvement comes from switching to a solid-state drive (SSD), which significantly reduces load times and increases system responsiveness. \n\nFor gamers, upgrading the graphics card (GPU) will enhance visual quality and game performance. But don't forget the importance of cooling solutions and power supply. As your components become more powerful, they generate more heat, and it's crucial to have proper cooling and a power supply capable of supporting your new setup. With these upgrades, you'll transform your PC into a powerhouse.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Builds", href: "#" },
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/a5/28/74/a52874a5cb8dc3d5a2f245f00fa56874.jpg",
    title: "Our Recommendations",
    href: "#",
    description:
      "When it comes to improving your tech setup, general recommendations can make a big difference in daily efficiency and comfort. We're not just talking about internal components but also peripherals and accessories that complement your tech experience. \n\nFor those looking to enhance overall PC performance, we recommend investing in high-performance components like the latest processors, powerful GPUs, and SSDs for faster load times. If you spend long hours at your desk, ergonomic chairs and quality monitors are key to maintaining good posture and boosting productivity. \n\nIn terms of peripherals, a high-quality mechanical keyboard can improve both gaming and work experiences. Precision mice are also great for designers and editors. Additionally, optimizing your system's cooling with advanced fans or liquid cooling solutions helps maintain consistent performance under heavy workloads. Our curated recommendations will help you build an efficient, powerful, and comfortable setup that suits both your work and leisure needs.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Components", href: "#" },
  },
];
</script>

<template>
  <div class="bg-white py-20">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="space-y-16">
        <article
          v-for="post in posts"
          :key="post.id"
          class="flex flex-col lg:flex-row items-start gap-8"
        >
          <div class="w-full lg:w-1/2 mt-20">
            <img
              :src="post.image"
              alt="post.imageAlt"
              class="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div class="flex flex-col justify-between w-full lg:w-1/2">
            <div>
              <div class="flex items-center gap-x-4 text-xs mb-4">
                <time :datetime="post.datetime" class="text-gray-500">{{
                  post.date
                }}</time>
                <a
                  :href="post.category.href"
                  class="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200"
                  >{{ post.category.title }}</a
                >
              </div>

              <h3 class="text-2xl font-semibold text-gray-900 mb-4">
                <a :href="post.href" class="hover:underline">{{
                  post.title
                }}</a>
              </h3>

              <p class="text-gray-700 leading-7 whitespace-pre-line">
                {{ post.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
