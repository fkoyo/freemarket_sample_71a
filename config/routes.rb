Rails.application.routes.draw do
  # devise_for :users
  root to: 'products#index'

  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: "users/registrations",
    omniauth_callbacks: 'users/omniauth_callbacks'
  }


  # devise_for :users, controllers: {
  #   registrations: 'users/registrations'
  # }
  devise_scope :user do
        get '/users/sign_out' => 'devise/sessions#destroy'
    # resources :users do
    #   collection do
        get  'addresses', to: 'users/registrations#new_address'
        post 'addresses', to: 'users/registrations#create_address'
        get "users/index",to: "users#index"
        get "users/card", to: "users#card"
        get "users/products",to:"users#products"
        get "users/logout", to: "users#logout"
    #   end
    # end
  end
  # get '/users/sign_out' => 'devise/sessions#destroy'
  # get "users/index",to: "users#index"
  # get "users/card", to: "users#card"
  # get "users/products",to:"users#products"
    # get "users/logout", to: "users#logout"
  #   get  'addresses', to: 'users/registrations#new_address'
  #   post 'addresses', to: 'users/registrations#create_address'
  # end
  resources :users, only: [:index]

  resources :products do
    resources :purchases do
      collection do
        get "set_images"    
        # post "card", to: "purchases#card"
        post "done", to: "purchases#done"
        post 'pay', to: "purchases#pay"
      end
    end
  end

  resources :cards, only: [:index, :new, :create, :destroy] do
    collection do
      post 'pay', to: 'cards#pay'
    end
  end

  get 'products/new/mid_category', to: 'products#mid_category'
  get 'products/new/small_category', to: 'products#small_category'
end


