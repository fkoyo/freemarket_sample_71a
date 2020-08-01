class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  before_action :basic_auth, if: :production?
  # before_action :basic_auth
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_ancestry

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :email, :last_name, :first_name, :last_name_fri, :first_name_fri, :birth_year, :birth_month, :birth_day])
  end

  private

  def production?
    Rails.env.production?
  end

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end

  def set_ancestry
    @parent = Category.where(ancestry: nil)
  end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  # end

end