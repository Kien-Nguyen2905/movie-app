import { ref, computed, onUnmounted } from 'vue'

interface UseInfiniteScrollOptions<T> {
  fetchFn: (page: number) => Promise<{ results: T[]; total_pages: number }>
  initialPage?: number
}

export function useInfiniteScroll<T>({ fetchFn, initialPage = 1 }: UseInfiniteScrollOptions<T>) {
  const results = ref<T[]>([])
  const page = ref(initialPage)
  const totalPages = ref(1)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const triggerRef = ref<HTMLElement | null>(null)
  const observer = ref<IntersectionObserver | null>(null)

  const hasMore = computed(() => page.value < totalPages.value)

  const fetchData = async (reset = false) => {
    if (loading.value) return
    if (!reset && !hasMore.value) return

    try {
      loading.value = true
      error.value = null

      if (reset) {
        page.value = initialPage
        results.value = []
      }

      const response = await fetchFn(page.value)

      if (reset) {
        results.value = response.results
      } else {
        results.value = [...(results.value as T[]), ...response.results]
      }

      totalPages.value = response.total_pages
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch data'
    } finally {
      loading.value = false
    }
  }

  const loadMore = () => {
    if (hasMore.value && !loading.value) {
      page.value++
      fetchData(false)
    }
  }

  const reset = () => {
    fetchData(true)
  }

  const setupObserver = () => {
    if (!triggerRef.value) return

    observer.value = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore.value && !loading.value) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      },
    )

    observer.value.observe(triggerRef.value)
  }

  const cleanup = () => {
    if (observer.value && triggerRef.value) {
      observer.value.unobserve(triggerRef.value)
      observer.value.disconnect()
    }
  }

  onUnmounted(cleanup)

  return {
    results,
    page,
    totalPages,
    loading,
    error,
    hasMore,
    triggerRef,
    fetchData,
    loadMore,
    reset,
    setupObserver,
    cleanup,
  }
}
