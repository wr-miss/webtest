#!/bin/bash

# RuigeTest 部署脚本
# 这个脚本可以帮助你快速部署网站到各种平台

set -e  # 遇到错误时退出

echo "🚀 RuigeTest 部署脚本"
echo "======================"

# 检查终端是否支持颜色
if [ -t 1 ] && command -v tput > /dev/null 2>&1 && tput colors > /dev/null 2>&1; then
    # 颜色定义
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    NC='\033[0m' # No Color
    COLOR_SUPPORT=true
else
    # 无颜色
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    NC=''
    COLOR_SUPPORT=false
fi

# 函数：打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "命令 $1 未找到，请先安装"
        return 1
    fi
    return 0
}

# 显示菜单
show_menu() {
    echo ""
    echo "请选择部署方式："
    echo "1) 本地测试"
    echo "2) 部署到 GitHub Pages"
    echo "3) 部署到 Vercel"
    echo "4) 部署到 Netlify"
    echo "5) 所有平台都部署"
    echo "6) 退出"
    echo ""
    read -p "请输入选项 (1-6): " choice
}

# 本地测试
local_test() {
    print_info "开始本地测试..."
    
    # 检查文件是否存在
    if [ ! -f "index.html" ]; then
        print_error "index.html 文件不存在"
        return 1
    fi
    
    echo ""
    echo "选择本地服务器："
    echo "1) Python HTTP 服务器"
    echo "2) Node.js http-server"
    echo "3) 直接打开浏览器"
    echo ""
    read -p "请输入选项 (1-3): " server_choice
    
    case $server_choice in
        1)
            check_command python3 || return 1
            print_info "启动 Python HTTP 服务器..."
            python3 -m http.server 8000 &
            SERVER_PID=$!
            print_success "服务器已启动，访问 http://localhost:8000"
            print_info "按 Ctrl+C 停止服务器"
            wait $SERVER_PID
            ;;
        2)
            check_command npx || return 1
            print_info "启动 Node.js http-server..."
            npx http-server -p 8080
            ;;
        3)
            print_info "在浏览器中打开 index.html..."
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open index.html
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open index.html
            elif [[ "$OSTYPE" == "msys" ]]; then
                start index.html
            else
                print_error "不支持的操作系统"
                return 1
            fi
            print_success "请在浏览器中查看网页"
            ;;
        *)
            print_error "无效选项"
            return 1
            ;;
    esac
}

# 部署到 GitHub Pages
deploy_github_pages() {
    print_info "开始部署到 GitHub Pages..."
    
    check_command git || return 1
    
    # 检查是否在 Git 仓库中
    if [ ! -d ".git" ]; then
        print_info "初始化 Git 仓库..."
        git init
        git add .
        git commit -m "Initial commit: RuigeTest website"
    fi
    
    # 获取远程仓库信息
    read -p "请输入 GitHub 仓库地址 (例如: https://github.com/username/ruigetest.git): " repo_url
    
    if [ -z "$repo_url" ]; then
        print_error "仓库地址不能为空"
        return 1
    fi
    
    # 添加远程仓库
    print_info "添加远程仓库..."
    git remote add origin $repo_url 2>/dev/null || git remote set-url origin $repo_url
    
    # 推送到 GitHub
    print_info "推送到 GitHub..."
    git branch -M main
    git push -u origin main
    
    print_success "代码已推送到 GitHub"
    echo ""
    print_info "接下来需要手动启用 GitHub Pages："
    echo "1. 访问 https://github.com/你的用户名/ruigetest"
    echo "2. 点击 Settings → Pages"
    echo "3. 在 Source 中选择 main 分支"
    echo "4. 点击 Save"
    echo "5. 等待几分钟，访问 https://你的用户名.github.io/ruigetest"
}

# 部署到 Vercel
deploy_vercel() {
    print_info "开始部署到 Vercel..."
    
    check_command npm || return 1
    
    # 检查是否已登录 Vercel
    if ! npx vercel whoami 2>/dev/null; then
        print_info "请先登录 Vercel..."
        npx vercel login
    fi
    
    # 部署
    print_info "正在部署到 Vercel..."
    npx vercel --prod
    
    print_success "部署完成！"
    print_info "访问 https://ruigetest.vercel.app 查看网站"
}

# 部署到 Netlify
deploy_netlify() {
    print_info "开始部署到 Netlify..."
    
    check_command npm || return 1
    
    # 检查是否已安装 Netlify CLI
    if ! command -v netlify &> /dev/null; then
        print_info "安装 Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # 检查是否已登录
    if ! netlify status 2>/dev/null | grep -q "Logged in"; then
        print_info "请先登录 Netlify..."
        netlify login
    fi
    
    # 初始化 Netlify 项目
    if [ ! -f "netlify.toml" ]; then
        print_info "创建 Netlify 配置文件..."
        cat > netlify.toml << EOF
[build]
  publish = "."
  command = "echo 'No build needed'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
    fi
    
    # 部署
    print_info "正在部署到 Netlify..."
    netlify deploy --prod
    
    print_success "部署完成！"
    print_info "访问 https://ruigetest.netlify.app 查看网站"
}

# 检查项目文件
check_project_files() {
    print_info "检查项目文件..."
    
    required_files=("index.html" "style.css" "script.js" "README.md")
    missing_files=()
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -gt 0 ]; then
        print_error "缺少以下文件："
        for file in "${missing_files[@]}"; do
            echo "  - $file"
        done
        return 1
    fi
    
    print_success "所有必需文件都存在"
    return 0
}

# 显示部署信息
show_deploy_info() {
    echo ""
    echo "📋 部署信息"
    echo "-----------"
    echo "项目名称: RuigeTest"
    echo "文件数量: $(find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.md" | wc -l)"
    echo "总大小: $(du -sh . | cut -f1)"
    echo ""
    echo "可用的部署平台："
    echo "  • GitHub Pages - 完全免费，适合静态网站"
    echo "  • Vercel - 部署快速，适合现代前端框架"
    echo "  • Netlify - 功能全面，适合各种项目"
    echo ""
}

# 主函数
main() {
    echo ""
    cat << "EOF"
    ____    _   _      _     ______          _   
   |  _ \  (_) | |    | |   |  ____|        | |  
   | |_) |  _  | |  __| |   | |__     __ _  | |_ 
   |  _ <  | | | | / _` |   |  __|   / _` | | __|
   | |_) | | | | || (_| |   | |____ | (_| | | |_ 
   |____/  |_| |_| \__,_|   |______| \__,_|  \__|
                                                 
EOF
    echo ""
    
    # 检查项目文件
    check_project_files || exit 1
    
    # 显示部署信息
    show_deploy_info
    
    while true; do
        show_menu
        
        case $choice in
            1)
                local_test
                ;;
            2)
                deploy_github_pages
                ;;
            3)
                deploy_vercel
                ;;
            4)
                deploy_netlify
                ;;
            5)
                print_info "部署到所有平台..."
                deploy_github_pages
                deploy_vercel
                deploy_netlify
                print_success "所有平台部署完成！"
                ;;
            6)
                print_info "退出部署脚本"
                exit 0
                ;;
            *)
                print_error "无效选项，请重新选择"
                ;;
        esac
        
        # 询问是否继续
        echo ""
        read -p "是否继续部署？ (y/n): " continue_deploy
        if [[ ! "$continue_deploy" =~ ^[Yy]$ ]]; then
            print_info "感谢使用部署脚本！"
            exit 0
        fi
    done
}

# 运行主函数
main "$@"