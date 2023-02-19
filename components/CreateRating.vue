<template>
  <modal-base>
    <form class="space-y-8" @submit.prevent="createRating">
      <div class="space-y-8">
        <div>
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Avaliação</h3>
            <p class="mt-1 text-gray-500">Compartilhe o que achou da sua visita na <span class="font-medium text-red-800">{{ auditoriumName }}</span> do cinema <span class="font-medium text-red-800">{{ theaterName }}</span>.</p>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

            <div class="sm:col-span-6">
              <label for="image-rating" class="block text-sm font-medium text-gray-700">Imagem</label>
              <div class="mt-1">
                <input
                    name="image-rating"
                    id="image-rating"
                    type="number"
                    min="1"
                    max="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    :value="image_rating"
                    @input="image_rating = $event.target.value !== '' ? parseInt($event.target.value, 10) : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <div class="sm:col-span-6">
              <label for="audio-rating" class="block text-sm font-medium text-gray-700">Áudio</label>
              <div class="mt-1">
                <input
                    name="audio-rating"
                    id="audio-rating"
                    type="number"
                    min="1"
                    max="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    :value="audio_rating"
                    @input="audio_rating = $event.target.value !== '' ? parseInt($event.target.value, 10) : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <div class="sm:col-span-6">
              <label for="comfort-rating" class="block text-sm font-medium text-gray-700">Conforto</label>
              <div class="mt-1">
                <input
                    name="comfort-rating"
                    id="comfort-rating"
                    type="number"
                    min="1"
                    max="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    :value="comfort_rating"
                    @input="comfort_rating = $event.target.value !== '' ? parseInt($event.target.value, 10) : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <div class="sm:col-span-6">
              <label for="bomboniere-rating" class="block text-sm font-medium text-gray-700">Bomboniere</label>
              <div class="mt-1">
                <input
                    name="bomboniere-rating"
                    id="bomboniere-rating"
                    type="number"
                    min="1"
                    max="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    :value="bomboniere_rating"
                    @input="bomboniere_rating = $event.target.value !== '' ? parseInt($event.target.value, 10) : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <div class="sm:col-span-6">
              <label for="experience-rating" class="block text-sm font-medium text-gray-700">Experiência</label>
              <div class="mt-1">
                <input
                    name="experience-rating"
                    id="experience-rating"
                    type="number"
                    min="1"
                    max="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    :value="experience_rating"
                    @input="experience_rating = $event.target.value !== '' ? parseInt($event.target.value, 10) : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <div class="sm:col-span-6">
              <label for="review" class="block text-sm font-medium text-gray-700">Comentários</label>
              <div class="mt-1">
                <textarea
                    id="review"
                    name="review"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    v-model="review"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Use suas palavras para detalhar como foi sua experiência.</p>
            </div>

            <div class="sm:col-span-6">
              <label for="visited-at" class="block text-sm font-medium text-gray-700">Data da visita</label>
              <div class="mt-1">
                <input
                    name="visited-at"
                    id="visited-at"
                    type="date"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    v-model="visited_at"
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <MovieFinder v-model="tmdb_movie_id" label="Filme assistido" />
            </div>

            <div class="sm:col-span-6">
              <label for="seat" class="block text-sm font-medium text-gray-700">Lugar escolhido</label>
              <div class="mt-1">
                <input
                    name="seat"
                    id="seat"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    v-model="seat"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <div class="sm:col-span-6">
              <label for="seat-rating" class="block text-sm font-medium text-gray-700">Satisfação com o lugar</label>
              <div class="mt-1">
                <input
                    name="seat-rating"
                    id="seat-rating"
                    type="number"
                    min="1"
                    max="5"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm"
                    :value="seat_rating"
                    @input="seat_rating = $event.target.value !== '' ? parseInt($event.target.value, 10) : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

          </div>
        </div>
      </div>

      <div class="pt-5">
        <Button type="submit" :loading="loading">Enviar</Button>
      </div>
    </form>
  </modal-base>
</template>

<script setup lang="ts">
import { useToast } from 'tailvue'

const props = defineProps({
  auditoriumId: {
    type: Number,
    required: true,
  },
  auditoriumName: {
    type: String,
    required: true,
  },
  theaterName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['ratingCreated'])

const $toast = useToast()

const image_rating = ref(null as Number|null)
const audio_rating = ref(null as Number|null)
const comfort_rating = ref(null as Number|null)
const bomboniere_rating = ref(null as Number|null)
const experience_rating = ref(null as Number|null)
const visited_at = ref(null)
const tmdb_movie_id = ref(null)
const seat = ref(null)
const seat_rating = ref(null as Number|null)
const review = ref('' as string)

const { mutate: createRatingMutate, error, loading } = useMutation(gql`
      mutation createRating (
        $auditorium_id: Int!,
        $image_rating: Int,
        $audio_rating: Int,
        $comfort_rating: Int,
        $bomboniere_rating: Int,
        $experience_rating: Int,
        $review: String,
        $tmdb_movie_id: Int!,
        $visited_at: Date!
        $seat: String,
        $seat_rating: Int,
      ) {
        createRating (input: {
          auditorium_id: $auditorium_id,
          image_rating: $image_rating
          audio_rating: $audio_rating
          comfort_rating: $comfort_rating
          bomboniere_rating: $bomboniere_rating
          experience_rating: $experience_rating
          review: $review
          visited_at: $visited_at
          tmdb_movie_id: $tmdb_movie_id,
          seat: $seat,
          seat_rating: $seat_rating,
        }) {
          id
        }
      }
    `, () => ({
  variables: {
    auditorium_id: parseInt(props.auditoriumId, 10),
    image_rating: image_rating.value,
    audio_rating: audio_rating.value,
    comfort_rating: comfort_rating.value,
    bomboniere_rating: bomboniere_rating.value,
    experience_rating: experience_rating.value,
    review: review.value,
    tmdb_movie_id: tmdb_movie_id.value,
    visited_at: visited_at.value,
    seat: seat.value,
    seat_rating: seat_rating.value,
  },
}))

const createRating = async function () {
  await createRatingMutate()
  if (!error.value) {
    $toast.show({
      type: 'success',
      message: 'Avaliação enviada com sucesso',
      timeout: 6,
    })
    emit('ratingCreated')
  }
}
</script>
