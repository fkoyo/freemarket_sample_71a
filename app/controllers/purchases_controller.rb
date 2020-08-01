class PurchasesController < ApplicationController
  require "payjp" 
  before_action :set_item,only:[:index]
  before_action :set_card, :set_item
  
  def index
    @product = Product.find(params[:product_id])
    @address = Address.find_by(user_id: current_user.id)
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
      redirect_to controller: :cards, action: :new
      flash[:notice] = 'クレジットカード情報が登録されていません。登録後、購入手続きを実施してください。'
    end
  end

  def pay
    # if @product.status.present?
    if @product.status == 1
      redirect_to product_path(@product.id)
      flash[:notice] = 'こちらの商品は売り切れています。'
    else
      @product.with_lock do
      @product = Product.find(params[:product_id])
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      Payjp::Charge.create(
        :amount => @product.price, #支払金額を引っ張ってくる
        :customer => @card.customer_id,  #顧客ID
        :currency => 'jpy',              #日本円
      )
      Purchase.create(product_id: params[:product_id],user_id: current_user.id)
      @product.update(status: 1)
      flash[:notice] = '購入が完了しました。'
      redirect_to product_path(@product) 
      end
    end
  end

  def done
    @product_purchase = Product.find(params[:id])
    @product_purchase.update(purchase_histories_id: current_user.id)
  end


private
  def set_card
    @card = Card.find_by(user_id: current_user.id)
  end

  def set_item
    @product = Product.find(params[:product_id])
  end
end