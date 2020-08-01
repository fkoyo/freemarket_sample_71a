class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update]
  before_action :set_params, only: :create
  before_action :set_categories, only: [:edit, :update]
  before_action :current_user, only: [:edit, :update]

  def index
    # @products = Product.where(status:0).recent(3)
    @products = Product.recent(3)
  end

  def new
    @product = Product.new
    @product.photos.new
  end

  def create
    @product = Product.new(set_params)
    if @product.save
      flash[:alert] = '出品が完了しました。'
      redirect_to controller: :products, action: :index, notice: "出品できました。"
    else
      flash[:alert] = '必須事項を入力してください。'
      redirect_to controller: :products, action: :new
    end
  end

  def edit
  end

  def update
    if @product.update(set_params)
      flash[:alert] = '商品情報を編集しました。'
      redirect_to controller: :products, action: :index, notice: "商品情報を編集しました"
    else
      flash[:alert] = '必須事項を入力してください。'
      redirect_to edit_product_path, notice: "入力必須項目を確認してください"
    end

  end

  def show 
  end

  def destroy
    Product.find(params[:id]).destroy
    flash[:alert] = '出品を取り消しました。'
    redirect_to root_path
  end

  def mid_category
    @mid_categories = Category.where(ancestry: params[:big_category_id])
    render json: @mid_categories
  end

  def small_category
    @small_categories = Category.where(ancestry: "#{params[:big_category_id]}/#{params[:mid_category_id]}")
    render json: @small_categories
  end

  private
  def set_product
    @product = Product.find(params[:id])
  end

  def set_params
    params.require(:product).permit(:name, :content, :category_id, :brand, :condition_id, :fee_id, :area_id, :shippingday_id, :price, photos_attributes: [:name, :_destroy, :id]).merge(user_id: current_user.id)
  end

  def set_categories
    @categories = Category.where(ancestry: nil)
  end

  def correct_user
    if @current_user.id !=  @product.user_id
      flash[:alert] = '商品情報を編集しました。'
      redirect_to controller: :products, action: :index, notice: "商品情報を編集しました"
    else
      flash[:alert] = '必須事項を入力してください。'
      redirect_to edit_product_path, notice: "入力必須項目を確認してください"
    end
  end
end