class CardsController < ApplicationController

  require "payjp" 
  before_action :card, only: [:index, :create, :destroy ]

  def index
    if @card.present?
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(@card.customer_id)
      @card_customer = customer.cards.retrieve(@card.card_id)

      @card_brand_image = @card_customer.brand
      case @card_brand_image
      when "Visa"
        @card_src = "visa.gif"
      when "JCB"
        @card_src = "jcb.gif"
      when "MasterCard"
        @card_src = "master.gif"
      when "American Express"
        @card_src = "amex.gif"
      when "Diners Club"
        @card_src = "diners.gif"
      when "Discover"
        @card_src = "discover.gif"
      end
    
      @card_month = @card_customer.exp_month.to_s
      @card_year = @card_customer.exp_year.to_s.slice(2,3)
      
    else
      redirect_to action: :new
    end
  end

  def new
    # redirect_to card_path(current_user.id) if @card.present?
  end
  
  def create
    Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
    if params["payjp_token"].blank?
      redirect_to action: "new"
      flash[:alert] = 'クレジットカードを登録できませんでした。'
    else
      customer = Payjp::Customer.create(
        email: current_user.email,
        card: params["payjp_token"],
        metadata: {user_id: current_user.id}
      )
      
      @card = Card.new(user_id: current_user.id, customer_id: customer.id, card_id: customer.default_card)
      if @card.save
        redirect_to controller: :cards, action: :index
        flash[:alert] = 'クレジットカード登録が成功しました'

      else
        redirect_to controller: :cards, action: :new
          flash[:alert] = 'クレジットカード登録に失敗しました'
      end
    end
  end

  def destroy
    if card.blank?
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      customer = Payjp::Customer.retrieve(@card.customer_id)
      customer.delete
      @card.delete
    end
      redirect_to controller: :users, action: :card
  end


  private
  def card
    @card = Card.find_by(user_id: current_user.id)
  end
end
